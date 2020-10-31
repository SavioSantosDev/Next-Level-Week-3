import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {


    async index( request: Request, response: Response ) {

        const orphanagesRepository = getRepository(Orphanage);

        // Dentro de find tem vários métodos
        const orphanages = await orphanagesRepository.find({
            relations: [
                'orphanage_data',
                'orphanage_visits',
                'orphanage_images'
            ]
        });

        return response.json(orphanageView.renderMany(orphanages))
    },


    async show( request: Request, response: Response ) {

        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        // Encontrar com o id, senão vai retornar um erro
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: [
                'orphanage_data',
                'orphanage_visits',
                'orphanage_images'
            ]
        });

        // Agora é a view que determinal o que vai ser retornado ou não
        return response.json(orphanageView.render(orphanage))
    },


    async create(request: Request, response: Response) {

        const orphanagesRepository = getRepository(Orphanage);

        // Desestruturando
        const {
            name,

            about,
            phone,
            latitude,
            longitude,

            instructions,
            openning_hours,
            open_on_weekends
        } = request.body;
        // ***

        // Pegando as imagens
        const requestImages = request.files as Express.Multer.File[];
        const orphanage_images = requestImages.map(image => {
            return { path: image.filename }
        });

        // const data = { name, orphanage_data, orphanage_visits, orphanage_images };
        const data = {
            name,
            orphanage_data: {
                about,
                phone,
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            orphanage_visits: {
                instructions,
                openning_hours,
                open_on_weekends: open_on_weekends === 'true'
            },
            orphanage_images
        };

        const phoneRegExp = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;
        const schema = Yup.object().shape({
            name:       Yup.string().required(),
            orphanage_data: Yup.object().shape({
                about:      Yup.string().required().max(300, 'Máximo de 300 carácteres!'),
                phone:      Yup.string().required().matches(phoneRegExp, 'Formato de telefone inválido!'),
                latitude:   Yup.number().required(),
                longitude:  Yup.number().required(),
            }),
            orphanage_visits: Yup.object().shape({
                instructions:       Yup.string().required().max(300, 'Máximo de 300 carácteres!'),
                openning_hours:     Yup.string().required(),
                open_on_weekends:   Yup.boolean().required(),
            }),
            orphanage_images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false   // Abortar no primeiro erro que encontrar ou mostrar todos os erros
        });

        // Criando a tabela
        const orphanage = orphanagesRepository.create(data);
        
        console.log(orphanage);
        // Inserindo a tabela criada no banco de dados
        await orphanagesRepository.save(orphanage);
    
        // 201 - Opcional, mas é bom pra mostrar que algo foi criado, a criação deu certo.
        return response.status(201).json(orphanage);
    }
};
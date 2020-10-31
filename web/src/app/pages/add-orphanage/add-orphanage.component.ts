import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { HappyService } from 'src/app/services/happy.service';
import Orphanage from 'src/models/Orphanage';

@Component({
  selector: 'app-add-orphanage',
  templateUrl: './add-orphanage.component.html',
  styleUrls: ['./add-orphanage.component.scss']
})
export class AddOrphanageComponent implements OnInit {

  // Icones
  faPlus = faPlus;  // Adicionar imagem
  faTimes = faTimes;  // Remover imagem

  // Formulário
  formulario: FormGroup;

  // Imagens para preview e upload
  imagesUpload: Set<File> = new Set();
  imagesPreview: (string | ArrayBuffer)[] = [];

  sub: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private happyService: HappyService,
  ) { }


  ngOnInit(): void {

    const phoneRegExp = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;

    // Os campos do formulário devem seguir as propriedades do model "Orphanage.ts";
    this.formulario = this.formBuilder.group({

      name: [ null, [ Validators.required ] ],
      orphanage_data: this.formBuilder.group({
        about: [ null, [ Validators.required ] ],
        phone: [ null, [ Validators.required, Validators.pattern(phoneRegExp) ] ],
        latitude: [ 10.902345 ],
        longitude: [ -53.12345 ],
      }),

      orphanage_visits: this.formBuilder.group({
        instructions: [ null, [ Validators.required, Validators.maxLength(300) ] ],
        openning_hours: [ null, [ Validators.required ] ],
        open_on_weekends: [ false, [ Validators.required ] ],
      }),

    });

  }


  /**
   * Evento disparado quando o usuário submeter o formulário
   */
  onSubmit(): void {
    if (  this.formulario.valid  ) {

      const modelData = this.formulario.value;

      this.sub = this.happyService.createOrphanage( modelData, this.imagesUpload )
        .subscribe(
          data => {
            console.log(data);
            this.formReset();
          }, error => console.log(error)
        );

    } else {
      this.verificarValidacoesForm(  this.formulario  );
    }
  }


  /**
   * Lidará com a lista de imagens para upload e para preview
   */
  onChange(  files: FileList  ): void {

    const selectedImages = Array.from(files);  // Converter FileList para array

    if (selectedImages && selectedImages.length > 0) {

      selectedImages.forEach(  (image: File) => {

        // Adicionando a imagem para upload
        this.imagesUpload.add(image);

        // Preparando imagem para preview:
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = event => {
          const imageURL = reader.result;
          this.imagesPreview.push(imageURL);  // Add a imagem no array para preview
        };
      });
    }
  }


  /**
   * Remover os elementos de acordo o índice indicado.
   */
  removeImage(  index: number  ): void {

    // imagesPreview é um array simples, basta utilizar o metodo splice.
    this.imagesPreview.splice(index, 1);

    // Para imagesUpload que o um Set o esquema é diferente.
    // Fará uma iteração com um contador, se o msm for igual ao index, deleta a image e sai do loop
    let count = 0;
    for (  const item of this.imagesUpload.values()  ) {
      if ( count === index ) {
        this.imagesUpload.delete(item);
        break;
      }
      count ++;
    }
  }


  verificarValidacoesForm(  formGroup: FormGroup  ): void {
    console.log('alguma coisa está errada');
    // Object.keys(  formGroup.controls  ).forEach(  campo => {
    //   // console.log(campo);
    //   const controle = formGroup.get(campo);
    //   controle.markAsTouched(); // No CSS o estilo é feito com o touched.
    // });
  }


  /**
   * Resetar o formulário. Apagar todos os campos
   */
  formReset(): void {
    this.formulario.reset();
  }

}


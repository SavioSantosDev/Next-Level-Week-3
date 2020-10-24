import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import { HappyService } from 'src/app/services/happy.service';

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

  imagesUpload: Set<File> = new Set();  // As que vão para o servidor
  imagesPreview: (string | ArrayBuffer)[] = [];  // As que vão ficar a mostra para o usuário


  constructor(
    private formBuilder: FormBuilder,
    private happyService: HappyService,
  ) { }


  ngOnInit(): void {

    const phoneRegExp = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;

    // Construindo o formulário
    this.formulario = this.formBuilder.group({

      orphanage_data: this.formBuilder.group({
        name: [ null, [ Validators.required ] ],
        about: [ null, [ Validators.required ] ],
        phone: [ null, [ Validators.required, Validators.pattern(phoneRegExp) ] ],
        // latitude: [ null ],
        // longitude: [ null ],
      }),

      visits: this.formBuilder.group({
        instructions: [ null, [ Validators.required, Validators.maxLength(300) ] ],
        openning_hours: [ null, [ Validators.required ] ],
        open_on_weekends: [ false, [ Validators.required ] ],
      }),

    });

  }


  /**
   * Método que irá fazer as requizições com o servidor
   */
  submit() {



    console.log(valueSubmit);

    // Enviar dados para o servidor, ja transformadas em json
    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .subscribe(
      dados => {
        // Resetar o formulário
        this.resetar();
      }, ( erro: any ) => {
        alert('Aconteceu um erro!');
      }
    );
  }


  /**
   * Evento disparado quando o usuário submeter o formulário
   */
  onSubmit(): void {
    if (  this.formulario.valid  ) {

      const valueSubmit = this.formulario.value;
      this.happyService.createOrphanage( valueSubmit );

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


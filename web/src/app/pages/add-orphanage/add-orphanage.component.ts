import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LeafletMouseEvent, Map } from 'leaflet';
import { Subscription } from 'rxjs';

import { HappyService } from 'src/app/services/happy.service';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'app-add-orphanage',
  templateUrl: './add-orphanage.component.html',
  styleUrls: ['./add-orphanage.component.scss']
})
export class AddOrphanageComponent extends MapComponent implements OnInit, OnDestroy {

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
  ) {
    super();
  }


  ngOnInit(): void {

    // Inicializar as configurações do mapa e o marcador para ser configurado dentro do mapa;
    this.initializeMapOptions();

    const phoneRegExp = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;

    // Os campos do formulário devem seguir as propriedades do model "Orphanage.ts";
    this.formulario = this.formBuilder.group({

      name: [ null, [ Validators.required ] ],
      orphanage_data: this.formBuilder.group({
        about: [ null, [ Validators.required ] ],
        phone: [ null, [ Validators.required, Validators.pattern(phoneRegExp) ] ],
        latitude: [ null, [ Validators.required ] ],
        longitude: [ null, [ Validators.required ] ],
      }),

      orphanage_visits: this.formBuilder.group({
        instructions: [ null, [ Validators.required, Validators.maxLength(300) ] ],
        openning_hours: [ null, [ Validators.required ] ],
        open_on_weekends: [ false, [ Validators.required ] ],
      }),

    });

  }


  ngOnDestroy(): void {
    // Desfazendo a incrição feita ao submeter o formulário
    // tslint:disable-next-line: no-unused-expression
    this.sub && this.sub.unsubscribe();
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
            window.alert(`${this.formulario.get('name').value} Adicionado com sucesso`);
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


  /**
   * Trabalhar melhor essa função
   */
  verificarValidacoesForm(  formGroup: FormGroup  ): void {
    console.log('alguma coisa está errada');
    // Object.keys(  formGroup.controls  ).forEach(  campo => {
    //   // console.log(campo);
    //   const controle = formGroup.get(campo);
    //   controle.markAsTouched(); // No CSS o estilo é feito com o touched.
    // });
  }


  /**
   * Resetar o formulário ao submeter com sucesso o submete-lo
   */
  formReset(): void {
    this.formulario.reset();
  }


  /**
   * Método sobreposto da classe Map
   */
  onMapReady(  map: Map  ): void {
    this.map = map;
    this.initializeMarker();
  }


  /**
   * Altera a posição do marcador do orfanato e os valores dos campos de coordenadas do formulário
   */
  setOrphanage(  e: LeafletMouseEvent  ): void {
    const { lat, lng } = e.latlng;
    this.setMarkerPosition(  lat, lng  );

    this.formulario.patchValue({
      orphanage_data: {
        latitude: lat,
        longitude: lng
      }
    });
  }

}


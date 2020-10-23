import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-orphanage',
  templateUrl: './add-orphanage.component.html',
  styleUrls: ['./add-orphanage.component.scss']
})
export class AddOrphanageComponent implements OnInit {

  faPlus = faPlus;
  faTimes = faTimes;

  orphanage: any = {
    name: null,
    latitude: null,
    longitude: null,
    about: null,
    instructions: null,
    opening_hours: null ,
    open_on_weekends: true,
    // images: [
    //   {
    //     "url": "assets/orphanages-images/img (1).jpg"
    //   },
    //   {
    //     "url": "assets/orphanages-images/img (2).jpg"
    //   }
    // ]
  };

  imagesUpload: Set<File> = new Set();  // As que vão para o servidor
  imagesPreview: (string | ArrayBuffer)[] = [];  // As que vão ficar a mostra para o usuário

  constructor(
  ) { }

  ngOnInit(): void {
  }

  controlValid(): boolean {
    return false;
  }


  /**
   * Atualizará a lista de imagens para upload e para preview
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
          this.imagesPreview.push(imageURL);
        };
      });
    }
    console.log(  this.imagesUpload, this.imagesPreview  );
  }


  /**
   * Remover os elementos no índice indicado.
   */
  removeImage(  index: number  ): void {

    // imagesPreview é um array simples, basta utilizar o metodo splice.
    this.imagesPreview.splice(index, 1);

    // Para imagesUpload que o um Set o esquema é diferente.
    let count = 0;
    for (  const item of this.imagesUpload.values()  ) {
      if ( count === index ) {
        this.imagesUpload.delete(item);
        break;
      }
      count ++;
    }

    console.log(  this.imagesUpload, this.imagesPreview  );
  }


  onSubmit(  f: NgForm  ): void {

    console.log(f.value);
  }

}


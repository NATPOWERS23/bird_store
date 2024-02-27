import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageSnippet } from 'src/app/admin/pages/create/types/icreate-form';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  imports: [NgClass, NgIf, NgStyle],
})
export class FileUploaderService {
  @Input() public selectedFile: ImageSnippet = { src: '' };
  @Output() public imageSnippetEventEmitter: EventEmitter<ImageSnippet> =
    new EventEmitter<ImageSnippet>();

  public processFile(imageInput: HTMLInputElement): void {
    const file: File | undefined = imageInput?.files?.[0];
    const reader = new FileReader();
    reader.addEventListener('load', (el: ProgressEvent<FileReader>) => {
      this.selectedFile = {
        file: file,
        src: el?.target?.result,
      };
      this.imageSnippetEventEmitter.emit(this.selectedFile);
    });
    if (file) reader.readAsDataURL(file);
  }

  public clearImage(): void {
    this.selectedFile = { src: '' };
    this.imageSnippetEventEmitter.emit(this.selectedFile);
  }
}

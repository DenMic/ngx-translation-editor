import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[edtDragDrop]',
  standalone: true,
})
export class DragDropDirective {
  @HostBinding('class') fileOver?: string;
  fileDropped = output<boolean>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = 'bg-green-600 bg-opacity-30';
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = undefined;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = undefined;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}

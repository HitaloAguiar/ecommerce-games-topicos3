import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-telefone-form',
  templateUrl: './telefone-form.component.html',
  styleUrls: ['./telefone-form.component.css']
})
export class TelefoneFormComponent {

  @Input() telefoneForm: FormGroup; // FormGroup do telefone

  // @Output() removerTelefone = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.telefoneForm = this.fb.group({
      numero: ''
    });
  }
}

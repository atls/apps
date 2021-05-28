import set              from 'lodash.set'
import { EventEmitter } from 'events'

import { FormData }     from './form.interfaces'

export class FormStore extends EventEmitter {
  private data: FormData = {}

  constructor(data: FormData) {
    super()

    this.data = data
  }

  static create(data: FormData) {
    return new FormStore(data)
  }

  getData() {
    return this.data
  }

  setValue(path: string[], value) {
    set(this.data, path, value)

    this.emit('change', this.data)
  }
}

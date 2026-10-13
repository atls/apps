import type { FormData } from './form.interfaces'

import { EventEmitter }  from 'events/'
import set               from 'lodash.set'

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

  setValue(path: Array<string>, value: unknown) {
    set(this.data, path, value)

    this.emit('change', this.data)
  }
}

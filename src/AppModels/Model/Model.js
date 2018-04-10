import _ from 'lodash';
import { helpers } from 'AppServices';

export class Model {
  constructor(props) {
    this.checkModel();
    this.props = _.pick(props, Object.keys(this.constructor.schema));
  }

  get(attr) {
    return this.props[attr];
  }

  set(key, value) {
    this.props[key] = value;
    return this;
  }

  toJSON() {
    return Object.keys(this.constructor.schema).reduce((memo, key) => {
      let result = memo;
      const val = this.props[key];
      if (val) {
        result = Object.assign(memo, { [key]: val });
      }
      return result;
    }, {});
  }

  checkModel() {
    if (!this.constructor.baseUrl) {
      throw new Error('Missing model base url');
    }
    if (!this.constructor.modelName) {
      throw new Error('Missing model name');
    }
    if (!this.constructor.schema) {
      throw new Error('Missing model schema');
    }
  }

  isPersisted() {
    return !!this.props.id;
  }

  checkInstanceExists() {
    if (!this.isPersisted()) {
      const { modelName } = this.constructor;
      throw new Error(`${modelName} must be created first`);
    }
  }

  create() {
    const { baseUrl, modelName } = this.constructor;
    const data = this.toJSON();
    return helpers.requestJSON(baseUrl, {
      method: 'POST',
      body: JSON.stringify({ [modelName]: data }),
    })
    .then(payload => {
      Object.assign(this.props, payload);
      return this;
    });
  }

  fetch() {
    const { baseUrl, modelName } = this.constructor;
    const data = this.toJSON();
    return helpers.requestJSON(baseUrl, {
      method: 'GET',
      body: JSON.stringify({ [modelName]: data }),
    })
    .then(payload => {
      Object.assign(this.props, payload);
      return this;
    });
  }

  update(props) {
    const { baseUrl, modelName } = this.constructor;
    Object.assign(this.props, props);
    if (!this.props.id) {
      throw new Error(`${modelName} is missing an id`);
    }
    return helpers.requestJSON(`${baseUrl}/${this.props.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ [modelName]: this.toJSON() }),
    })
    .then(() => this);
  }

  remove() {
    const { baseUrl, modelName } = this.constructor;
    if (!this.props.id) {
      throw new Error(`${modelName} is missing an id`);
    }
    return helpers.requestJSON(`${baseUrl}/${this.props.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      Object.assign(this.props, { id: null });
      return this;
    });
  }
}

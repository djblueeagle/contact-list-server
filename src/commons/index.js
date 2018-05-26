export default class SwaggerResponses {
  constructor(successCode, successValue) {
    this._successCode = successCode;
    this._successValue = successValue;
  }

  getValue() {
    return {
      [this._successCode]: this._successValue,
    };
  }
}

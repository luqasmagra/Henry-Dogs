export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (
    !input.heightMin ||
    !input.heightMax ||
    input.heightMin < 0 ||
    input.heightMax < 0
  ) {
    errors.height = "Height is required and must be greater than 0";
  }
  if (input.heightMin > input.heightMax) {
    errors.height = "Minimum height must be less than maximum";
  }

  if (
    !input.weightMin ||
    !input.weightMax ||
    input.weightMin < 0 ||
    input.weightMax < 0
  ) {
    errors.weight = "Weight is required and must be greater than 0";
  }
  if (input.weightMin > input.weightMax) {
    errors.weight = "Minimum weight must be less than maximum";
  }
  if (!/^([0-9])*$/.test(input.life_span)) {
    errors.life_span = "Life span must be a greater than 0";
  }

  return errors;
}

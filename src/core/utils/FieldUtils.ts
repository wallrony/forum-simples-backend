export function verifyMandatoryFields(body: Record<string, any>, mandatoryFields: string[]) {
  const emptyFields: string[] = [];

  for(const field of mandatoryFields) {
    if(!body[field]) {
      emptyFields.push(field);
    }
  }

  return emptyFields;
}

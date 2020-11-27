/**helpers yazmadan avatar inputa hec ne daxil etmeyende, split etmeye de data olmadigi ucun error verir. 
 * exportun icerisinde helpers kodunu yazaraq bu errordan qurtuluruq
 */
import { helpers } from 'vuelidate/lib/validators'

//Here value is input value. We get input value
export const supportedFileType = (value) => {
  if (!helpers.req(value)) return this

  const allowedFormats = ['jpg', 'png', 'jpeg']
  const extension = value.split('.').pop()
  return allowedFormats.includes(extension)
}

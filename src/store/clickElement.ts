/**
 * 全埋点相关属性存储
 */



 interface clickElementValue {
  element_function?: string;
  element_id?: string;
  element_content?: string;
  element_type?: string;
  element_name?: string;
 }

 export const userClickAttrs: clickElementValue = {}

 export function setUserClickAttrs (attrs: any) {
  userClickAttrs.element_function = attrs.function || ''
  userClickAttrs.element_id = attrs.id || ''
  userClickAttrs.element_content = attrs.content || ''
  userClickAttrs.element_type = attrs.type || ''
  userClickAttrs.element_name = attrs.name || ''
 }
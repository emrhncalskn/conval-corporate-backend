import { Roles } from "src/permissions/entities/roles.entity"

export class ErrorMessages {
   static REGISTER_ERROR() {
      return {
         TR: "Girdiğiniz e-mail üzerine kayıtlı bir hesap bulunmaktadır.",
         EN: "There is no account registered on the e-mail you entered."
      }
   }
   static PASSWORD_CHANGE_ERROR() {
      return {
         TR: "kullanıcı şifresi değiştirilemedi.",
         EN: "User password could not be changed."
      }
   }
   static LOGIN_ERROR() {
      return {
         TR: "Girdiğiniz hesap bilgileri yanlış.",
         EN: "The account information you entered is incorrect."
      }
   }
   static WRONG_PASSWORD_ERROR() {
      return {
         TR: "Eski sifrenizi yanlış girdiniz.",
         EN: "You entered your old password incorrectly."
      }
   }
   static SAME_PASSWORD_ERROR() {
      return {
         TR: "Eski sifreniz ile yeni şifreniz aynı olamaz.",
         EN: "Your old password cannot be the same as your new password."
      }
   }
   static PRE_APPLICATION_ORDER_CHANGE_ERROR() {
      return {
         TR: "Ön başvuru sıralama işlemi başarısız.",
         EN: "Pre application order change failed."
      }
   }
   static ROLE_CREATE_ERROR() {
      return {
         TR: "Rol oluşturma işlemi başarısız.",
         EN: "Role create failed."
      }
   }
   static PRE_APPLICATION_CREATE_ERROR() {
      return {
         TR: "Ön başvuru işlemi başarısız.",
         EN: "Pre application failed."
      }
   }
   static PRE_APPLICATION_DELETE_ERROR() {
      return {
         TR: "Ön başvuru silme işlemi başarısız.",
         EN: "Pre application delete failed."
      }
   }
   static PERMISSION_ERROR(roles: Roles[]) {
      let role_names = "";
      roles.forEach(element => {
         role_names += element.name + " / ";
      });
      role_names = role_names.substring(0, role_names.length - 3);
      return {
         TR: "Bu işlemi yapmak için " + role_names + " yetkisine sahip olmalısınız.",
         EN: "You must have " + role_names + " authority to do this."
      }
   }
   static ROLES_NOT_FOUND_ERROR(roles_ids: number[]) {
      let role_ids = "";
      roles_ids.forEach(element => {
         role_ids += element + " / ";
      });
      role_ids = role_ids.substring(0, role_ids.length - 3);
      return {
         TR: role_ids + " id'li roller bulunamadı.",
         EN: "Roles with id " + role_ids + " not found."
      }
   }
   static RESERVATION_CANNOT_CONFIRM_ERROR() {
      return {
         TR: "Rezervasyon onaylanamadı.",
         EN: "Reservation didn't confirm."
      }
   }
   static RESERVATION_CANNOT_CREATE_ERROR() {
      return {
         TR: "Rezervasyon oluşturulamadı.",
         EN: "Reservation didn't create."
      }
   }
   static RESERVATION_END_TIME_NOT_FOUND_ERROR() {
      return {
         TR: "Rezervasyon bitiş zamanı bulunamadı.",
         EN: "Reservation end time not found."
      }
   }
   static RESERVATION_START_TIME_NOT_FOUND_ERROR() {
      return {
         TR: "Rezervasyon başlangıç zamanı bulunamadı.",
         EN: "Reservation start time not found."
      }
   }
   static ROOM_NOT_FOUND_ERROR() {
      return {
         TR: "Oda bulunamadı.",
         EN: "Room not found."
      }
   }
   static ROOM_NOT_AVAILABLE_ERROR() {
      return {
         TR: "Oda müsait değil.",
         EN: "Room not available."
      }
   }
   static USER_PHOTO_NOT_FOUND() {
      return {
         tr: "Silinmek istenilen fotoğraf kullanıcıya ait değil.",
         en: "The photo to be deleted does not belong to the user."
      }
   }
   static FILE_UPLOAD_ERROR() {
      return {
         tr: "Dosya yüklenemedi.",
         en: "The file cannot upload."
      }
   }
   static USER_PHOTO_TYPE_NOT_FOUND() {
      return {
         tr: "Fotoğraf tipi bulunamadı.",
         en: "No photo type found."
      }
   }
   static PHOTO_NOT_FOUND() {
      return {
         tr: "Fotoğraf bulunamadı.",
         en: "No photo found."
      }
   }
   static PHOTO_PATH_NOT_FOUND() {
      return {
         tr: "Fotoğraf dosya yolu bulunamadı.",
         en: "No photo file path found."
      }
   }
   static USER_NOT_FOUND() {
      return {
         tr: "Kullanıcı bulunamadı.",
         en: "No user found."
      }
   }
   static CV_NOT_FOUND() {
      return {
         tr: "Cv bulunamadı.",
         en: "No cv found."
      }
   }
   static CV_CREATE_ERROR() {
      return {
         tr: "Cv oluşturulamadı.",
         en: "Cv not created."
      }
   }
   static PRE_APPLICATION_ORDER_NOT_FOUND() {
      return {
         tr: "Ön başvuru sırası bulunamadı.",
         en: "No pre application order found."
      }
   }
   static PRE_APPLICATION_CHANGE_ERROR() {
      return {
         tr: "Ön başvuru değiştirme işlemi başarısız.",
         en: "Pre application change failed."
      }
   }
   static PRE_APPLICATION_NOT_FOUND() {
      return {
         tr: "Ön başvuru bulunamadı.",
         en: "No pre application found."
      }
   }

   static CONTACT_FORM_REQUIRED_FIELD_ERROR() {
      return {
         tr: "Lütfen tüm alanları doldurunuz.",
         en: "Please fill in all fields."
      }
   }

   static MAIL_SEND_ERROR(result: any) {
      return {
         tr: "Mail gönderilemedi.",
         en: "Mail not sent.",
         result: result
      }
   }
   static FILE_FORMAT_ERROR() {
      return {
         tr: "Dosya formatı hatalı.",
         en: "File format error."
      }
   }
}

export class ConfirmMessages {
   static HEALTH_CHECK(): any {
      throw new Error('Method not implemented.')
   }
   static REGISTER_SUCCESS() {
      return {
         TR: "Kayıt işlemi başarılı.",
         EN: "Registration successful."
      }
   }
   static PASSWORD_CHANGE_SUCCESS() {
      return {
         TR: "Şifre değiştirme işlemi başarılı.",
         EN: "Password change successful."
      }
   }
   static LOGIN_SUCCESS() {
      return {
         TR: "Giriş işlemi başarılı.",
         EN: "Login successful."
      }
   }
   static PRE_APPLICATION_CREATE_SUCCESS() {
      return {
         TR: "Ön başvuru işlemi başarılı.",
         EN: "Pre application successful."
      }
   }
   static PRE_APPLICATION_DELETE_SUCCESS() {
      return {
         TR: "Ön başvuru silme işlemi başarılı.",
         EN: "Pre application delete successful."
      }
   }
   static PRE_APPLICATION_UPDATE_SUCCESS() {
      return {
         TR: "Ön başvuru güncelleme işlemi başarılı.",
         EN: "Pre application update successful."
      }
   }
   static PRE_APPLICATION_ORDER_CHANGE_SUCCESS() {
      return {
         TR: "Ön başvuru sıralama işlemi başarılı.",
         EN: "Pre application order change successful."
      }
   }
   static ROLE_CREATE_SUCCESS() {
      return {
         TR: "Rol oluşturma işlemi başarılı.",
         EN: "Role create successful."
      }
   }
   static FILE_UPLOAD_CONFIRM() {
      return {
         tr: "Dosya başarıyla yüklendi.",
         en: "The file has been successfully updated."
      }
   }
   static MAIL_SEND_CONFIRM(result: any) {
      return {
         tr: "Mail başarıyla gönderildi.",
         en: "Mail sent successfully.",
         result: result
      }
   }
   static HEALTH_CHECK_CONFIRM() {
      return {
         tr: "Sağlık kontrolü başarılı.",
         en: "Health check successful."
      }
   }
}
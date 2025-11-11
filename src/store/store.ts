
import { makeAutoObservable } from 'mobx';
import { userMock } from '@/api/user_db';
import {IUser} from "@/store/interfaces"

class store {
  constructor() {
    makeAutoObservable(this);
  }

  user = {} as IUser;    
  setUser(newuser: IUser) {this.user = newuser;}

  isLoginOpen = true; 
  setIsLoginOpen(bool: boolean) {this.isLoginOpen = bool}

  isAuth = false;
  setAuth(bool: boolean) {this.isAuth = bool;}

  async login() {
        try {
            //const response = await axios_Service.login(email, password);
            //console.log('response')
            //localStorage.setItem('user', response.data.accessToken);
            /*localStorage.setItem('refreshtoken', response.data.refreshToken);
            localStorage.setItem('clientId', response.data.user.id);
            this.setUser(response.data.user);*/
            localStorage.setItem('user', JSON.stringify(userMock));
            this.setAuth(true);
            this.SetPopup("")
        } catch {
            /*console.log(e.response?.data?.message);*/
        }
  }

  async logout() {
        try {
            localStorage.removeItem('user');
            this.setAuth(false);
        } catch  {
            /*console.log(e.response?.data?.message);*/
        }
  }

  popup = "";
  SetPopup(name:string){this.popup = name} 

  addToFav (ProductId:string) {
    const tempUser = this.user
    tempUser.fav.push(ProductId)
    this.updateUser(tempUser)
    localStorage.setItem("user", JSON.stringify(tempUser))
  }
  
  removeFav (ProductId:string) {
    const tempUser = this.user
    tempUser.fav = tempUser.fav.filter((el) => el !== ProductId)
    this.updateUser(tempUser)
  }

  updateNameInContact (name:string, index:number) {
    const tempUser = this.user
    tempUser.contact[index].name = name
    this.updateUser(tempUser)
  }

  updatePhoneInContact (phone:string, index:number) {
    const tempUser:IUser = this.user
    tempUser.contact[index].phone = phone
    this.updateUser(tempUser)
  }

  updateDefaultInContact (ContactIndex:number) {
    const tempUser:IUser = this.user
    console.log(ContactIndex)
    tempUser.contact.forEach((contact, index)=>{
      //console.log(ContactIndex, index)
      if(ContactIndex===index){
        tempUser.contact[index].defaultContact = true;
      } else {
        tempUser.contact[index].defaultContact = false;
      }
    })
    //console.log(tempUser.contact)
    this.updateUser(tempUser)
  }

  updateAdress (adress:string, index:number) {
    const tempUser:IUser = this.user
    tempUser.adress[index].adress = adress
    this.updateUser(tempUser)
  }

  updateUser (propsUser:IUser) {
    this.setUser(propsUser)
    localStorage.setItem("user", JSON.stringify(propsUser))
  }

  toastType = "";
  SetToastType(type:string){this.toastType = type}
  
  toastMsg = "";
  SetToastMsg(msg:string){this.toastMsg = msg}

  isToastShow = false;
  SetIsToastShow(show:boolean){this.isToastShow = show}

  ShowToastMsg (type:string, msg:string ) {
    this.SetToastType(type)
    this.SetToastMsg(msg)
    this.SetIsToastShow(true)
  }
}

export const Store = new store();
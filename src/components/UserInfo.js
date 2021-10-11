export default class UserInfo {
  /** constructor of Card class.
   * @param name - contains the user's name.
   * @param occupation - contains the user's job.
   */
  constructor({ name, occupation, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
    this._avatar = document.querySelector(avatar);
  }

  /** returns an object with information about the user. */
  getUserInfo() {
    const obj = {};
    obj["name"] = this._name.textContent;
    obj["occupation"] = this._occupation.textContent;
    obj["id"] = this._id;

    return obj;
  }

  /** takes new user data and adds it on the page.
   * @param name - contains the new user's name.
   * @param occupation - contains the new user's job.
   */
  setUserInfo({ name, occupation, id }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
    this._id = id;
  }

  /** this function set a new user's avatar.
   * @param url - a link to the new image.
   */
  setAvatar(url) {
    this._avatar.src = url;
  }
}

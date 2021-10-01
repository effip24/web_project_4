export default class UserInfo {
  /** constructor of Card class
   * @param name - contains the user's name.
   * @param occupation - contains the user's job.
   */
  constructor({ name, occupation }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
  }

  /** returns an object with information about the user. */
  getUserInfo() {
    let obj = {};
    obj["name"] = this._name.textContent;
    obj["occupation"] = this._occupation.textContent;

    return obj;
  }

  /** takes new user data and adds it on the page.
   * @param name - contains the new user's name.
   * @param occupation - contains the new user's job.
   */
  setUserInfo({ name, occupation }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }
}

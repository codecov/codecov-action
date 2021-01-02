export default class Coverage {

  //This function is tested and part of it is uncovered
  uncovered_if = (a = true) => {
    if (a == true) {
      return false
    } else {
      return true
    }
  }

  //This function will be fully covered
  fully_covered = () => {
    return true
  }

  //This function will not be tested by unit tests
  uncovered = () => {
    return true
  }
}

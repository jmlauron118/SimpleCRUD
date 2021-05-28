const DashboardViewModel = require("./dashboard-view-model");
const Dialog = require("@nativescript/core/ui/dialogs");
var searchTimeout;

export function onLoaded(args) {
  const page = args.object

  page.bindingContext = new DashboardViewModel();
  page.bindingContext.GetAllUsers();
}

export function AddUser(args){
  const elem = args.object
  const page = elem.page; 

  page.frame.navigate({
    moduleName: "views/users/users",
    animated: true,
    transition: {
      name : "slideLeft",
      duratio: 250,
      curve: "easeInOut"
    },
    context: {
      action: "add"
    }
  });
}

export function onSwipeCellStarted(args){
  const swipeView = args.object;
  const swipeLimits = args.data.swipeLimits;
  const leftLimit = swipeView.getViewById("grid-button");

  swipeLimits.left = leftLimit.getMeasuredWidth();
  swipeLimits.right = 0;
  swipeLimits.threshold = leftLimit.getMeasuredWidth();
}

export function UpdateDetails(args){
  const elem = args.object;
  const page = elem.page;
  const userid = elem.parent.userid;

  page.frame.navigate({
    moduleName: "views/users/users",
    animated: true,
    transition: {
      name : "slideLeft",
      duratio: 250,
      curve: "easeInOut"
    },
    context:{
      userid: userid,
      action: "update"
    }
  });
}

export function RemoveDetails(args){
  const elem = args.object;
  const page = elem.page;
  let userid = elem.parent.userid;

  Dialog.confirm({
    title: "Remove User",
    message: "Do you want to remove this user?",
    cancelButtonText: "No",
    okButtonText: "Yes"
  }).then((result) =>{
    if(result){
      page.bindingContext.RemoveUserDetails(userid);
    }
  });
}

export function onSearchTextChange(args){
  const elem = args.object;
  const page = elem.page;

  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() =>{
    page.bindingContext.SearchUser(elem.text);
  }, 300);
}

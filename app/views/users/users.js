const UserViewModel = require("./users-view-model");
import { hasNullOrUndefined } from '~/core/validation';
require("nativescript-dom");

export function onNavigatingTo(args){
    const page = args.object;
    const context = args.context;

    page.bindingContext = new UserViewModel();
    page.bindingContext.set("action", context.action);
    
    context.action == "add" ? page.bindingContext.set("title", "Add User") : page.bindingContext.set("title", "Update User");

    if(context.action == "update"){
        page.bindingContext.set("userid", context.userid);
        page.bindingContext.GetUserById(context.userid, function(response){
            page.bindingContext.set("firstname", response[0][1]);
            page.bindingContext.set("lastname", response[0][2]);
            page.bindingContext.set("address", response[0][3]);
        });
    }
}

export function ClearFields(args){
    const elem = args.object;
    const page = elem.page;

    for(var input of page.getElementsByClassName("input")){ 
        input.text = "";
    }
}

export function AddUser(args){
    const elem = args.object;
    const page = elem.page;
    const context = page.bindingContext;

    var userDetails = [
        context.firstname,
        context.lastname,
        context.address
    ];

    if(!hasNullOrUndefined(userDetails)){
        if(context.action == "add"){
            context.AddUser(userDetails);
        }
        else{
            userDetails[userDetails.length] = context.userid;
            context.ModifyUserDetails(userDetails);
        }
        
        ClearFields(args);
    }
    else{
        alert("Please fill all fields!");
    }
}
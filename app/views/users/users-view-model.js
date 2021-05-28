const Observable = require("@nativescript/core").Observable;
const StoredProcedure = require("~/core/storedprocedure");
const moment = require("~/core/moment");

function UserViewModel(){
    const viewModel = new Observable();

    viewModel.AddUser = (userDetails) =>{
        StoredProcedure.execute("user/addUser.sql", userDetails).then(() =>{
            alert("Succesfully Added!");
        }).catch((err) =>{
            alert(`ERROR: ${err}`);
        });
    }

    viewModel.GetUserById = (userid, callback) =>{
        StoredProcedure.getData("user/getUserById.sql", userid).then((response) =>{
            callback(response);
        }).catch((err) =>{
            alert(`ERROR: ${err}`);
        });
    }

    viewModel.ModifyUserDetails = (details) =>{
        StoredProcedure.execute("user/modifyUserDetails.sql", details).then(() =>{
            alert("Succesfully Updated!");
        }).catch((err) =>{
            alert(`ERROR: ${err}`);
        });
    }

    return viewModel;
}

module.exports = UserViewModel;

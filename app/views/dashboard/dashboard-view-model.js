const Observable = require("@nativescript/core").Observable;
const ObservableArray = require("@nativescript/core").ObservableArray;
const StoredProcedure = require("~/core/storedprocedure");
const moment = require("~/core/moment");

function DashboardViewModel(){
  const viewModel = new Observable();
  viewModel.userDetails = new ObservableArray();
  viewModel.SearchedData = [];

  viewModel.GetAllUsers = () => {
      var details = [];

      StoredProcedure.getData("user/getAllUsers.sql").then((response) =>{
        for(var row in response){
            details[row] = {
                ID: response[row][0], 
                FIRST_NAME: response[row][1].toString().toUpperCase(),
                LAST_NAME: response[row][2].toString().toUpperCase(), 
                ADDRESS: response[row][3],
                DATE_CREATED: moment(response[row][4], "YYYY-MM-DD").format("MMMM DD, YYYY"),
            }
        } 
 
        viewModel.set("SearchedData", details);
        viewModel.set("userDetails", details);
      }).catch((err) =>{
          alert(`ERROR: ${err}`);
      });
  }

  viewModel.RemoveUserDetails = (userid) => {
    StoredProcedure.execute("user/removeUserById.sql", userid).then(() =>{
      viewModel.GetAllUsers();
      alert("Successfully deleted!");
    }).catch((err) =>{
      alert(`ERROR: ${err}`);
    });
  }

  viewModel.SearchUser = (searchText) => {
    var allData = viewModel.get("SearchedData");
    var filteredData = [];
    
    for(var obj of allData){
      var isExist = Object.keys(obj).some((index)=>{
        return obj[index].toString().toUpperCase().includes(searchText.toUpperCase());
      });

      if(isExist){
        filteredData.push(obj);
      }
    }

    viewModel.set("userDetails", filteredData);
  }

  return viewModel;
}

module.exports = DashboardViewModel;


/*****
You've been asked to program a bot for a popular bank that will automate the management of incoming requests. There are three types of requests the bank can receive:

transfer i j sum: request to transfer sum amount of money from the ith account to the jth one;
deposit i sum: request to deposit sum amount of money in the ith account;
withdraw i sum: request to withdraw sum amount of money from the ith account.
Your bot should also be able to process invalid requests. There are two types of invalid requests:

invalid account number in the requests;
deposit / withdrawal of a larger amount of money than is currently available.
For the given list of accounts and requests, return the state of accounts after all requests have been processed, or an array of a single element [-<request_id>] (please note the minus sign), where <request_id> is the 1-based index of the first invalid request.

Example

For accounts = [10, 100, 20, 50, 30] and
requests = ["withdraw 2 10", "transfer 5 1 20", "deposit 5 20", "transfer 3 4 15"],
the output should be bankRequests(accounts, requests) = [30, 90, 5, 65, 30].

Here are the states of accounts after each request:

"withdraw 2 10": [10, 90, 20, 50, 30];
"transfer 5 1 20": [30, 90, 20, 50, 10];
"deposit 5 20": [30, 90, 20, 50, 30];
"transfer 3 4 15": [30, 90, 5, 65, 30], which is the answer.
For accounts = [20, 1000, 500, 40, 90] and
requests = ["deposit 3 400", "transfer 1 2 30", "withdraw 4 50"],
the output should be bankRequests(accounts, requests) = [-2].

After the first request, accounts becomes equal to [20, 1000, 900, 40, 90], but the second one turns it into [-10, 1030, 900, 40, 90], which is invalid. Thus, the second request is invalid, and the answer is [-2]. Note that the last request is also invalid, but it shouldn't be included in the answer.
*****/

var accounts = [77367, 85558, 88570, 98242, 46552, 2772, 64226, 72128, 15176, 93254];
var requests = ["deposit 11 6", 
 "transfer 2 6 91", 
 "deposit 10 58", 
 "transfer 5 3 49", 
 "withdraw 8 40", 
 "withdraw 6 67", 
 "transfer 7 6 44", 
 "withdraw 5 7", 
 "transfer 8 2 20", 
 "transfer 9 2 94"];
function withdraw(accounts,sub_requests){
  var account_num = parseInt(sub_requests[1])-1;
  var value = parseInt(sub_requests[2]);
  var len = accounts.length;
  if(accounts[account_num]<value || (account_num+1) > len){
        return false;
  }else{
        accounts[account_num] = accounts[account_num] - value;
  }
  return accounts;
}
function deposit(accounts,sub_requests){
  var account_num = parseInt(sub_requests[1])-1;
  var value = parseInt(sub_requests[2]);
  var len = accounts.length;
  if((account_num+1) > len){
        return false;
  }else{
        accounts[account_num] = accounts[account_num] + value;
  }
  return accounts;
}
function transfer(accounts,sub_requests){
  var account_num_wd = parseInt(sub_requests[1])-1;
  var account_num_de = parseInt(sub_requests[2])-1;
  var value = parseInt(sub_requests[3]);
  var len = accounts.length;
  if(accounts[account_num_wd]<value || (account_num_wd+1) > len || (account_num_de+1) > len){
        return false;
  }else{
        // Withdraw
        accounts[account_num_wd] = accounts[account_num_wd] - value;
        // Deposit
        accounts[account_num_de] = accounts[account_num_de] + value;
  }
  return accounts;
}
function checkError(accounts){
  if(accounts==false)
       return true;
  var acc_len = accounts.length;
  for (var j = 0; j < acc_len; j++){
      if(accounts[j] < 0) {
          return true;
      }
  }
  return false;
}
function bankRequests(accounts, requests) {
  // General
  acc_len = accounts.length;
  rq_len = requests.length;
  arr_requests = [];
  results = [];
  is_error = [];
  step_error = [];
  for (var i = 0; i < rq_len; i++){

    arr_requests[i] = requests[i].split(" ");
      // Deposit
      if(arr_requests[i][0] == "deposit"){
          results = deposit(accounts,arr_requests[i]);
              is_error[i] = checkError(results);
              if(is_error[i] == true){
                  step_error[i] = [-i-1];
              }else{
                  step_error[i] = [0];
              }
      }
      

      // Withdraw
      else if(arr_requests[i][0] == "withdraw"){
          results    = withdraw(accounts,arr_requests[i]);
              is_error[i] = checkError(results);
              if(is_error[i] == true){
                  step_error[i] = [-i-1];
              }else{
                  step_error[i] = [0];
              }
      }

      // Transfer
      else if(arr_requests[i][0] == "transfer"){
          results    = transfer(accounts,arr_requests[i]);
              is_error[i] = checkError(results);
              if(is_error[i] == true){
                  step_error[i] = [-i-1];
              }else{
                  step_error[i] = [0];
              }
      }
      console.log(results);
      if(results == false)
        break;
  }

  if(results == false){
    for (var step = 0; step < step_error.length; step++){
        if(step_error[step].toString() !== "0"){
            return step_error[step];
            break;
        }
    }
  }else {
    return results;
  }
}

bankRequests(accounts, requests);
pragma solidity ^0.4.24;
import "./PaymentSplitter.sol";

contract Transferencia is PaymentSplitter {
    event PaymentReceived(address from, uint256 amount);
   // PaymentSplitter paymentsplitter = new PaymentSplitter;
   // address wallet_bussiness = 0x0Cd926B3AF45dceb93dcf1205756706854E6cA6D;
    address wallet_seller;
    // Recoge el wallet del vendedor
    function GetWalletSeller  (address _to) public {
        require (msg.sender != _to);
        wallet_seller = _to;

    }
    // Comprueba que el Buyer tenga saldo
   /* function CheckStatusBuyer(address _from, uint256 _amount) returns (bool) {
        require(_from.balance > _amount,false);
        return true;
    }*/
    function PaytoBussiness(address wallet_bussiness) public returns (bool) {
        release_bussiness(wallet_bussiness);
        return true;
    }

    function PaytoSeller(address _wallet_seller) private returns (bool){
        release_vendor(_wallet_seller);
        return true;
    }




    
}
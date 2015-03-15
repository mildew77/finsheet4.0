<?php

class MARSHALL {

//To call function -->   MARSHALL::hello();
//Needed to add C:\wamp\www\tape_maker\app\helpers\marshall.phpc
//Also update C:\wamp\www\tape_maker\app\start\global.php
//With app_path().'/helpers',


    public static function hello($someVar=NULL) {

        

        return 'hello world';
    }
	
	public static function join($field=NULL,$table=NULL) {
	

        

        return $table . '.' . $field[0];
    }
	

	
	public static function selectStructure($field=NULL,$table=NULL,$length=NULL) {
	
   $selectArray=[];
   $returnString='';
    	for($i=1;$i<$length;$i++){
		
		
	$fieldResultt=array_pluck($field,$i);
	$tableResultt=array_pluck($table,$i);
	if($fieldResultt[0]!="0"){
	
	$result=$tableResultt[0] .'.'.$fieldResultt[0];
	array_push($selectArray,$result);
	
	}

	
	
	
	}
      return $selectArray;
    }
	
/*tape maker for tails
$roles = DB::table('other')->join('loans','other.SellerLnNum', '=','loans.Loan_Value')
->join('splits','other.SellerLnNum', '=','splits.ClientLoanNumber')
->select('other.SellerLnNum','loans.Total_Appraised_Value','splits.CurrentInterestRate','other.balance_being_securitized','loans.PropertyState_Value','splits.ServiceFees','loans.FundingDate_Value','loans.TypeOfResidence_Value','loans.ClientGender_Value','loans.CoClientGender_Value','loans.ClientAge_Value','loans.CoClientAge_Value','loans.ROC_Value','loans.RMLoanType_Value','loans.LoanPurpose_Value','splits.CurrentLoanStatus','other.Type','loans.ClientBirthDate_Value','loans.CoClientBirthDate_Value','loans.PropertyZip_Value','splits.SecuritizedBeginningUPB','splits.UnSecuritizedBeginningUPB','splits.TotalPrincipalLimit','PaymentPlanType','splits.ScheduledPayment','splits.RemTerm','splits.NetLOC','loans.InitialInterestRateIndex_Value','splits.CurrentInterestRate')->get();
*/
	

}

?>
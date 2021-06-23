function BankDetails(data) {
  const { accountNumber, bankName, IFSCCode, bankBranch } = data;
  return (
    <div>
      <ul>
        <li>Account Number - {data.accountNumber}</li>
        <li>Bank Name - {data.bankName}</li>
        <li>IFSC Code - {data.IFSCCode}</li>
        <li>Branch Name - {data.bankBranch}</li>
      </ul>
    </div>
  );
}

export default BankDetails;

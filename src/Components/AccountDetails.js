function AccountDetails(data) {
  const { accountNumber, bankName, IFSCCode, bankBranch } = data.data;
  return (
    <div>
      <ul>
        <li>Account Number - {accountNumber}</li>
        <li>Bank Name - {bankName}</li>
        <li>IFSC Code - {IFSCCode}</li>
        <li>Branch Name - {bankBranch}</li>
      </ul>
    </div>
  );
}

export default AccountDetails;

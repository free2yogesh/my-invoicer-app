function AccountDetails(data) {
  const { accountName, accountNumber, bankName, IFSCCode, bankBranch } = data.data;
  return (
    <div>
      <h3>Account Details - {accountName}</h3>
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

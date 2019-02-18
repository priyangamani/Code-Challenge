const Address = () => ({
  getAddressStreet: address => {
    if (address)
      return `${address.number ? address.number : ''} ${address.prefix ? address.prefix : ''} ${
        address.street ? address.street : ''
      } ${address.type ? address.type : ''} `;
  },
  getAddressCity: address => {
    if (address)
      return `${address.city ? address.city : ''}, ${address.state ? address.state : ''} ${
        address.zip ? address.zip : ''
      }`;
  },
});
const Helpers = () => Object.assign({}, Address());

// export default DB();
module.exports = Helpers;

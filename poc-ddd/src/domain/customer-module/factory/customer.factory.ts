import Customer from "../entity/customer";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer(name);
    }

    public static createWithAddress(name: string, street: string, number: string, city: string, state: string, zip: string): Customer {
        let customer = new Customer(name);
        customer.updateAddres(street, number, city, state, zip);
        return customer;
    }

}
import Customer from "../entities/customer";
import Repository from "./repository";

export default interface CustomerRepository extends Repository<Customer> {
    
}
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomersService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomersController {
  async index(req: Request, res: Response) {
    const listCustomers = container.resolve(ListCustomersService);

    const customers = await listCustomers.execute();

    return res.status(200).json(customers);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return res.status(200).json(customer);
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return res.status(200).json(customer);
  }

  async update(req: Request, res: Response) {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id, name, email,
    });

    return res.status(200).json(customer);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return res.status(204).json();
  }
}

export default CustomersController;

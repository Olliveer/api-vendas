interface IMailConfig {
  driver: 'ethereal' | 'sas';
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'admin@oliveiradigital.online',
      name: 'Administrador API Vendas',
    },
  },
} as IMailConfig;

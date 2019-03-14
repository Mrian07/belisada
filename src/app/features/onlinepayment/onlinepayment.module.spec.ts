import { OnlinepaymentModule } from './onlinepayment.module';

describe('OnlinepaymentModule', () => {
  let onlinepaymentModule: OnlinepaymentModule;

  beforeEach(() => {
    onlinepaymentModule = new OnlinepaymentModule();
  });

  it('should create an instance', () => {
    expect(onlinepaymentModule).toBeTruthy();
  });
});

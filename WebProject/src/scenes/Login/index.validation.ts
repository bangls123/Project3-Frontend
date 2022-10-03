import { L } from '../../lib/abpUtility';

const rules = {
  userNameOrEmailAddress: [
    {
      required: true,
      message: L('Common.ThisFieldIsRequired'),
    },
  ],
  password: [{ required: true, message: L('Common.ThisFieldIsRequired') }],
};

export default rules;

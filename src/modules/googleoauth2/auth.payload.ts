export type Auth = {
  token: string;
  user: {
    nickname: string;
    email: string;
    provider: string;
    _id: string;
  };
};

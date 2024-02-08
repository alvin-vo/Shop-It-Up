import User from "../domain/User";

export interface UserRepo{
    fetchCart():string;
    fetchInvited(recievedInvites: string[]): Promise<User>;
    // rest of user's functions
}
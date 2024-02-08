import UserEntity from "../entity/UserEntity";
import User from "../domain/User";

export const mapUserEntitytoUserDomain = (userEntity: UserEntity): User =>{
    return{
        userId: userEntity.userId,
        productsToSell: userEntity.productsToSell,
        receivedInvites: userEntity.receivedInvites
    };
};


// gets the endpoint for user and then uses the rest api
// the transfroms from domain model to entity model
// after the retrieving or doing a rest api function
// return back to domain to return the orignial attributes

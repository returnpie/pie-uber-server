import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);
        if (notNull.password !== null) {
          user.password = notNull.password;
          user.save().catch((err) => {
            console.log(err);
          });
          delete notNull.password;
        }
        try {
          user.firstName = notNull.firstName;
          user.lastName = notNull.lastName;
          user.email = notNull.email;
          user.profilePhoto = notNull.profilePhoto;
          user.save().catch((err) => {
            console.log(err);
          });
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;

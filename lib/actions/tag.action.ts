"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared";
import Interaction from "@/database/interaction.model";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId, limit = 3 } = params;

    // Find the user by clerkId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find interactions for the user and group by tags
    const tagCountMap = await Interaction.aggregate([
      { $match: { user: user._id, tags: { $exists: true, $ne: [] } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    const topTags = tagCountMap.map((tagCount) => tagCount._id);

    // Find the tag documents for the top tags
    const topTagDocuments = await Tag.find({ _id: { $in: topTags } });

    return topTagDocuments;
  } catch (error) {
    console.error("Error fetching top interacted tags:", error);
    throw error;
  }
}

// export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
//     try {
//         connectToDatabase();

//         const {userId, limit = 3} = params;

//         const user = await User.findById(userId)

//         if(!user) throw new Error('user not found')

//         // Find interactions for the user and group by tags
//         const tagCountMap = await Interaction.aggregate([
//             {$match: {user: user._id, tags: {$exists: true, $ne: []}}},
//             {$unwind: "$tags"},
//             {$group: {_id: "$tags", count: {$sum: 1}}},
//             {$sort: {count: -1}},
//             {$limit: limit}
//         ])

//         const topTags = tagCountMap.map((tagCount) => tagCount._id);

//         // Find the tag documents for top tags
//         const tagDocuments = await Tag.find({_id: {$in: topTags}});

//         return tagDocuments;
//     } catch(error) {
//         console.log(error)
//         throw error
//     }
// }

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
  }
}

import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/auth";

export async function POST(request: NextRequest) {
    try {
        const { questionId, answer, authorId } = await request.json();

        if (!questionId || !answer || !authorId) {
            return NextResponse.json(
                { error: "Missing required fields: questionId, answer, authorId" },
                { status: 400 }
            );
        }

        // Create answer document
        const response = await databases.createDocument(
            db,
            answerCollection,
            ID.unique(),
            {
                content: answer,
                questionId,
                authorId,
            }
        );

        // Get current prefs
        const prefs = await users.getPrefs<UserPrefs>(authorId);
        const currentReputation = prefs.reputation || 0;

        // Update user reputation
        await users.updatePrefs<UserPrefs>(authorId, {
            reputation: currentReputation + 1,
        });

        return NextResponse.json(response, { status: 201 });

    } catch (error: any) {
        console.error("Error in POST /api/answer:", error);
        return NextResponse.json(
            { error: error?.message || "An unexpected error occurred" },
            { status: error?.status || error?.statusCode || 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const {answerId} = await request.json();
        if (!answerId) {
            return NextResponse.json(
                { error: "Missing required field: answerId" },
                { status: 400 }
            );
        }

        const answer = await databases.getDocument(db, answerCollection, answerId);
        if (!answer) {
            return NextResponse.json(
                { error: "Answer not found" },
                { status: 404 }
            );
        }

        const response = await databases.deleteDocument(db, answerCollection, answerId);

        const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
        const currentReputation = prefs.reputation || 0;

        // Update user reputation
        await users.updatePrefs<UserPrefs>(answer.authorId, {
            reputation: currentReputation - 1,
        });

        return NextResponse.json(response, { status: 200 });

    } catch (error: any) {
        console.error("Error in DELETE /api/answer:", error);
        return NextResponse.json(
            { error: error?.message || "An unexpected error occurred" },
            { status: error?.status || error?.statusCode || 500 }
        );
    }
}

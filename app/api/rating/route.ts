import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  const deliveredOrder = currentUser?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product?.reviews.find(
    (review: Review) => review.userId === currentUser.id
  );

  if (userReview || !deliveredOrder) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const review = await prisma?.review.create({
      data: {
        comment,
        rating,
        productId: product.id,
        userId,
      },
    });

    return new Response(JSON.stringify(review), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

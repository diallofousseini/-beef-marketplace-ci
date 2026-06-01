import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// POST /api/listings - Create a new listing
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, price, weightKg, city, images } = await request.json();

    // Validate
    if (!title || !price || !weightKg || !city || !images || images.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create listing
    const listing = await prisma.beefListing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        weightKg: parseFloat(weightKg),
        city,
        images,
        sellerId: (session.user as any).id,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}

// GET /api/listings - Get all listings (optional, for admin or public feed)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};
    if (city) {
      where.city = {
        contains: city,
        mode: "insensitive",
      };
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
      }
    }

    const listings = await prisma.beefListing.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
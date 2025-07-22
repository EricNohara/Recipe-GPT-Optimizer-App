import { NextRequest, NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(req: NextRequest) {
  try {
    // get search params
    const searchParams = req.nextUrl.searchParams;
    const dish = searchParams.get("dish");
    const maxLinks = searchParams.get("maxLinks");
    const sitename = searchParams.get("sitename");

    console.log(dish, maxLinks, sitename);

    if (!dish || dish == "")
      return NextResponse.json({
        status: 400,
        data: "Bad request: dish name required",
      });

    const res = await fetch(
      `https://gsfmtj5f3zld6a6xxlil7wwy3a0jbglh.lambda-url.us-east-2.on.aws/?dish=${dish}&max_links=${maxLinks}&sitename=${sitename}`
    );

    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!data) throw new Error();

    return NextResponse.json({ status: 200, data: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, data: "Internal server error" });
  }
}

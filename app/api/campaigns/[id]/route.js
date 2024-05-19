import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Campaign from '../../../../models/Campaign';

export async function GET(request) {
  await connectMongoDB();
  const {id} = params ; 

  try {
    const campaigns = await Campaign.findById(id);
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message },
{ status: 400 });
  }
}
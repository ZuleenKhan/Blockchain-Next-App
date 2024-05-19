import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';
import Campaign from '../../../models/Campaign';

export async function POST(request) {
  await connectMongoDB();
  const { campaignTitle, campaignDescription, campaignValidity } =
await request.json();

  try {
    const newCampaign = new Campaign({
      title: campaignTitle,
      description: campaignDescription,
      validity: {
        year: campaignValidity.year,
        month: campaignValidity.month,
        day: campaignValidity.day,
      },
    });

    await newCampaign.save();

    return NextResponse.json({ success: true, data: newCampaign });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message },
{ status: 400 });
  }
}
export async function GET(request) {
  await connectMongoDB();

  try {
    const campaigns = await Campaign.find({});
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
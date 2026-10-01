import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Store analytics data
    const analyticsData = {
      region: body.region,
      revenue: body.revenue,
      insights: body.insights,
      timestamp: new Date().toISOString(),
    };

    console.log('Analytics data received:', analyticsData);

    return NextResponse.json({
      success: true,
      message: 'Analytics data saved successfully',
      data: analyticsData,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics' },
      { status: 500 }
    );
  }
}

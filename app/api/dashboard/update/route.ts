import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Update dashboard with new report data
    const dashboardUpdate = {
      report_data: body.report_data,
      chart_data: body.chart_data,
      updated_at: new Date().toISOString(),
    };

    console.log('Dashboard update:', dashboardUpdate);

    return NextResponse.json({
      success: true,
      message: 'Dashboard updated successfully',
      data: dashboardUpdate,
    });
  } catch (error) {
    console.error('Dashboard update error:', error);
    return NextResponse.json(
      { error: 'Failed to update dashboard' },
      { status: 500 }
    );
  }
}

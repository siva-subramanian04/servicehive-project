import { Request, Response } from 'express';
import Lead from '../models/Lead';

export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    if (!name || !email || !source) {
      res.status(400).json({ status: 'error', message: 'Name, email, and source are required' });
      return;
    }

    const lead = await Lead.create({
      name,
      email,
      status: status || 'New',
      source,
    });

    res.status(201).json({ status: 'success', data: lead });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const { status, source, search, sort } = req.query;

    const query: Record<string, any> = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
      ];
    }

    const sortOption: Record<string, 1 | -1> = sort === 'Oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query).sort(sortOption).skip(skip).limit(limit);

    res.status(200).json({
      status: 'success',
      data: leads,
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({ status: 'error', message: 'Lead not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: lead });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      res.status(404).json({ status: 'error', message: 'Lead not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: lead });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      res.status(404).json({ status: 'error', message: 'Lead not found' });
      return;
    }

    res.status(200).json({ status: 'success', message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};

export const exportLeadsCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort } = req.query;

    const query: Record<string, any> = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
      ];
    }

    const sortOption: Record<string, 1 | -1> = sort === 'Oldest' ? { createdAt: 1 } : { createdAt: -1 };
    
    const leads = await Lead.find(query).sort(sortOption);

    const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
    const rows = leads.map((lead) => {
      return `"${lead.name}","${lead.email}","${lead.status}","${lead.source}","${lead.createdAt.toISOString()}"`;
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
};
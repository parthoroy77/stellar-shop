// Admin Actions
export interface IAdminAction {
  id: number;
  userId: number; // Foreign key referencing User (Admin)
  actionType: string;
  description?: string;
  createdAt: Date;
}

// System Logs
export interface ISystemLog {
  id: number;
  actionType: string;
  description?: string;
  createdAt: Date;
}

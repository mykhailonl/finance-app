export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4'
  }
  public: {
    Tables: {
      budgets: {
        Row: {
          category: Database['public']['Enums']['transaction_category']
          created_at: string
          id: number
          maximum: number
          theme: Database['public']['Enums']['theme_color']
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category: Database['public']['Enums']['transaction_category']
          created_at?: string
          id?: number
          maximum: number
          theme: Database['public']['Enums']['theme_color']
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: Database['public']['Enums']['transaction_category']
          created_at?: string
          id?: number
          maximum?: number
          theme?: Database['public']['Enums']['theme_color']
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pots: {
        Row: {
          created_at: string
          id: number
          name: string
          target: number
          theme: Database['public']['Enums']['theme_color']
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          target: number
          theme: Database['public']['Enums']['theme_color']
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          target?: number
          theme?: Database['public']['Enums']['theme_color']
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          avatar_person: Database['public']['Enums']['person_name'] | null
          category: Database['public']['Enums']['transaction_category']
          created_at: string
          id: number
          name: string
          recurring: boolean
          transaction_date: string
          transaction_type: Database['public']['Enums']['transaction_type']
          user_id: string | null
        }
        Insert: {
          amount: number
          avatar_person?: Database['public']['Enums']['person_name'] | null
          category: Database['public']['Enums']['transaction_category']
          created_at?: string
          id?: number
          name: string
          recurring?: boolean
          transaction_date: string
          transaction_type: Database['public']['Enums']['transaction_type']
          user_id?: string | null
        }
        Update: {
          amount?: number
          avatar_person?: Database['public']['Enums']['person_name'] | null
          category?: Database['public']['Enums']['transaction_category']
          created_at?: string
          id?: number
          name?: string
          recurring?: boolean
          transaction_date?: string
          transaction_type?: Database['public']['Enums']['transaction_type']
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_balance: {
        Args: Record<PropertyKey, never>
        Returns: {
          current: number
          expenses: number
          income: number
          user_id: string
        }[]
      }
    }
    Enums: {
      person_name:
        | 'Emma'
        | 'Daniel'
        | 'Ella'
        | 'Ethan'
        | 'Harper'
        | 'James'
        | 'Liam'
        | 'Lily'
        | 'Mason'
        | 'Rina'
        | 'Sebastian'
        | 'Sofia'
        | 'Sun'
        | 'William'
        | 'Yuna'
      theme_color:
        | 'green'
        | 'yellow'
        | 'cyan'
        | 'navy'
        | 'red'
        | 'purple'
        | 'light-purple'
        | 'turquoise'
        | 'brown'
        | 'magenta'
        | 'blue'
        | 'navy-grey'
        | 'army-green'
        | 'gold'
        | 'orange'
      transaction_category:
        | 'Bills'
        | 'Groceries'
        | 'Dining Out'
        | 'Entertainment'
        | 'Transportation'
        | 'Personal Care'
        | 'Education'
        | 'Lifestyle'
        | 'Shopping'
        | 'General'
        | 'Gift'
        | 'Interest'
        | 'Other'
        | 'Salary'
        | 'Sales'
      transaction_type: 'income' | 'expense'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      person_name: [
        'Emma',
        'Daniel',
        'Ella',
        'Ethan',
        'Harper',
        'James',
        'Liam',
        'Lily',
        'Mason',
        'Rina',
        'Sebastian',
        'Sofia',
        'Sun',
        'William',
        'Yuna',
      ],
      theme_color: [
        'green',
        'yellow',
        'cyan',
        'navy',
        'red',
        'purple',
        'light-purple',
        'turquoise',
        'brown',
        'magenta',
        'blue',
        'navy-grey',
        'army-green',
        'gold',
        'orange',
      ],
      transaction_category: [
        'Bills',
        'Groceries',
        'Dining Out',
        'Entertainment',
        'Transportation',
        'Personal Care',
        'Education',
        'Lifestyle',
        'Shopping',
        'General',
        'Gift',
        'Interest',
        'Other',
        'Salary',
        'Sales',
      ],
      transaction_type: ['income', 'expense'],
    },
  },
} as const
